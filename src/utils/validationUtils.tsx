

class ValidationUtils {
    isValidPhoneNumber(n: string): boolean {
        if(n == undefined || n.length < 10) {
            return false
        }

        return true
    }

    isValidString(s: string): boolean {
        if(s == undefined || s == '') {
            return false
        }
        return true
    }

    isValidNumber(n: number): boolean {
        if(n == undefined || n.toString.length <= 0) {
            return false
        }
        return true
    }
    
      isOnlyNumber(text) {
        const regex = /^[0-9]*$/;
        return regex.test(text);
      }
    
      isEmailValid(text) {
        if (this.isValidString(text)) {
          return false;
        }
    
        const re = /\S+@\S+\.\S+/;
        return re.test(text);
      }
    
      addCnpjMask(cnpj: string): string {
        return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1 $2 $3/$4-$5');
      }
    
      addCpfMask(cpf: string): string {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
      }
}

export default new ValidationUtils();