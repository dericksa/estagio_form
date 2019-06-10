import { isPromise, translate } from 'react-jhipster';
import { toast } from 'react-toastify';

const addErrorAlert = (message, key?, data?) => {
  if (!!key) {
    toast.error(translate(key, data));
    return;
  }

  toast.error(message);
};
export default () => next => action => {
  // If not a promise, continue on
  console.log("COOL")
  if (!isPromise(action.payload)) {
    return next(action);
  }

  /**
   *
   * The notification middleware serves to dispatch the initial pending promise to
   * the promise middleware, but adds a `then` and `catch.
   */
  return next(action)
    .then(response => {
      if (action.meta && action.meta.successMessage) {
        toast.success(action.meta.successMessage);
      } else if (response && response.action && response.action.payload && response.action.payload.headers) {
        const headers = response.action.payload.headers;
        let alert: string = null;
        let alertParams: string = null;
        Object.entries(headers).forEach(([k, v]: [string, {}]) => {
          if (k.toLowerCase().endsWith('app-alert')) {
          } else if (k.toLowerCase().endsWith('app-params')) {
          }
        });
        if (alert) {
          const alertParam = alertParams;
          toast.success(translate(alert, { param: alertParam }));
        }
      }
      return Promise.resolve(response);
    })
    .catch(error => {
      if (action.meta && action.meta.errorMessage) {
        toast.error(action.meta.errorMessage);
      } else if (error && error.response) {
        const response = error.response;
        const data = response.data;
        if (!(response.status === 401 && (error.message === '' || (data && data.path && data.path.includes('/api/account'))))) {
          let i;
          switch (response.status) {
            // connection refused, server not reachable
            case 0:
              addErrorAlert('Server not reachable', 'error.server.not.reachable');
              break;

            case 400:
              const headers = Object.entries(response.headers);
              let errorHeader = null;
              let entityKey = null;
              headers.forEach(([k, v]: [string, {}]) => {
                if (k.toLowerCase().endsWith('app-error')) {
                  errorHeader = v;
                } else if (k.toLowerCase().endsWith('app-params')) {
                  entityKey = v;
                }
              });
              if (errorHeader) {
                const entityName = translate('global.menu.entities.' + entityKey);
                addErrorAlert(errorHeader, errorHeader, { entityName });
              } else if (data !== '' && data.fieldErrors) {
                const fieldErrors = data.fieldErrors;
                for (i = 0; i < fieldErrors.length; i++) {
                  const fieldError = fieldErrors[i];
                  if (['Min', 'Max', 'DecimalMin', 'DecimalMax'].includes(fieldError.message)) {
                    fieldError.message = 'Size';
                  }
                  // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it
                  const convertedField = fieldError.field.replace(/\[\d*\]/g, '[]');
                  const fieldName = translate(`gifApp.${fieldError.objectName}.${convertedField}`);
                  addErrorAlert(`${fieldError.message}`, null);
                }
              } else if (data !== '' && data.message) {
                addErrorAlert(data.message, data.message, data.params);
              } else {
                addErrorAlert(!!data.detail ? data.detail : data);
              }
              break;

            case 404:
              if (data != null) {
                addErrorAlert(!!data.detail ? data.detail : data);
                break;
              }

              addErrorAlert('Not found', 'error.url.not.found');
              break;

            case 409:
              addErrorAlert(response.data.detail);
              break;

            default:
              if (data !== '' && data.message) {
                addErrorAlert(data.message);
              } else {
                addErrorAlert(data);
              }
          }
        }
      } else if (error && error.message) {
        toast.error(error.message);
      } else {
        toast.error('Unknown error!');
      }
      return Promise.reject(error);
    });
};
