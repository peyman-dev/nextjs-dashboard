

export const startsWith = (String_Content, key) => String(String_Content).startsWith(key);
export const endsWith = (String_Content, key) => String(String_Content).endsWith(key);
export const includes = (String_Content, key) => String(String_Content).includes(key);


export const exact = {
    test: function (string, key) { return String(string) == key },
    safeTest: function (string, key) {
        if (this.test(string, key)) {
            return {
                ok: true,
                message: "Test passed"
            }
        } else {
            return {
                ok: false,
                message: "Test failed"
            }
        }
    }
};

// A Object With Options

export const objectUnits = {
    getArray: (obj) => Object.keys(obj).map(key => key),

};

export const units = {
    capitilize: function (string) {
        return String(string).charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },
    conditional: (condition, trueValue, falseValue) => condition ? trueValue : falseValue,
    dataTest: (schema, data) => schema.safeParse(data),
    lowerCase: function (string) {
        return String(string).toLowerCase();
    },
    isString: function (string) {
        return Boolean(String(string));
    },
    cleanString: function (string) {
        return String(string).toLowerCase().replace(/\s/g, '');
    }
}
