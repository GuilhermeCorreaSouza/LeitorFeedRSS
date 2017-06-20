'use strict';

var util = {
    validator: {
        validarCPF: function (cpf) {
            cpf = cpf.replace(".", '').replace(".", '').replace("-", "");

            if (cpf === "00000000000" ||
                cpf === "11111111111" ||
                cpf === "22222222222" ||
                cpf === "33333333333" ||
                cpf === "44444444444" ||
                cpf === "55555555555" ||
                cpf === "66666666666" ||
                cpf === "77777777777" ||
                cpf === "88888888888" ||
                cpf === "99999999999")
                return false;

            var numeros, digitos, soma, i, resultado, digitosIguais;
            digitosIguais = 1;
            if (cpf.length < 11)
                return false;
            for (i = 0; i < cpf.length - 1; i++)
                if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
                    digitosIguais = 0;
                    break;
                }
            if (!digitosIguais) {
                numeros = cpf.substring(0, 9);
                digitos = cpf.substring(9);
                soma = 0;
                for (i = 10; i > 1; i--)
                    soma += numeros.charAt(10 - i) * i;
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado !== digitos.charAt(0))
                    return true;
                numeros = cpf.substring(0, 10);
                soma = 0;
                for (i = 11; i > 1; i--)
                    soma += numeros.charAt(11 - i) * i;
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado !== digitos.charAt(1))
                    return true;
                return true;
            }
            else
                return true;
        },
        validarCNPJ: function (cnpj) {
            //cnpj = cnpj.replace(/[^\d]+/g, '');

            if (cnpj === '') return false;

            if (cnpj.length !== 14)
                return false;

            // Elimina CNPJs invalidos conhecidos
            if (cnpj === "00000000000000" ||
                cnpj === "11111111111111" ||
                cnpj === "22222222222222" ||
                cnpj === "33333333333333" ||
                cnpj === "44444444444444" ||
                cnpj === "55555555555555" ||
                cnpj === "66666666666666" ||
                cnpj === "77777777777777" ||
                cnpj === "88888888888888" ||
                cnpj === "99999999999999")
                return false;

            // Valida DVs
            var tamanho;
            tamanho = cnpj.length - 2;
            var numeros;
            numeros = cnpj.substring(0, tamanho);
            var digitos = cnpj.substring(tamanho);
            var soma;
            soma = 0;
            var pos;
            pos = tamanho - 7;
            var i;
            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado !== digitos.charAt(0))
                return false;

            tamanho = tamanho + 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado !== digitos.charAt(1))
                return false;

            return true;
        },
        validarEmail: function (email) {
            // var exclude=/[^@-.w]|^[_@.-]|[._-]{2}|[@.]{2}|(@)[^@]*1/;
            // var check=/@[w-]+./;
            // var checkend=/.[a-zA-Z]{2,3}$/;
            // if(((email.search(exclude) != -1)||(email.search(check)) == -1)||(email.search(checkend) == -1)){return false;}
            // else {return true;}
        }
    },
    stringUtil: {
        removerAcentos: function (str) {
            var string = str;
            var mapaAcentosHex = {
                a: /[\xE0-\xE6]/g,
                A: /[\xC0-\xC6]/g,
                e: /[\xE8-\xEB]/g,
                E: /[\xC8-\xCB]/g,
                i: /[\xEC-\xEF]/g,
                I: /[\xCC-\xCF]/g,
                o: /[\xF2-\xF6]/g,
                O: /[\xD2-\xD6]/g,
                u: /[\xF9-\xFC]/g,
                U: /[\xD9-\xDC]/g,
                c: /\xE7/g,
                C: /\xC7/g,
                n: /\xF1/g,
                N: /\xD1/g
            };

            for (var letra in mapaAcentosHex) {
                var expressaoRegular = mapaAcentosHex[letra];
                string = string.replace(expressaoRegular, letra);
            }

            return string;
        },
        unformatCPF: function (cpf) {
            cpf = cpf.replace(".", "");
            cpf = cpf.replace(".", "");
            cpf = cpf.replace("-", "");
            return cpf;
        },
        formatCPF: function (cpf) {
            var cpf1parte = cpf.substring(0, 3);
            var cpf2parte = cpf.substring(3, 6);
            var cpf3parte = cpf.substring(6, 9);
            var cpfdigverificador = cpf.substring(9, 11);
            cpf = cpf1parte + (".") + cpf2parte + (".") + cpf3parte + ("-") + cpfdigverificador;

            return cpf;
        }
    },
    service: {

    },
    data: {
       conteudo: '',

    }
};

