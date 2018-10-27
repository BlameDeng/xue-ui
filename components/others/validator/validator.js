class Validator {
    constructor(rules) {
        this.rules = rules;
    }
    validate(data) {
        if (!(data instanceof Array) || !data.length) {
            return { info: '参数必须为非空数组' };
        }
        let copy = [];
        data.forEach(item => {
            if (this.rules) { let temp = Object.assign({}, item, this.rules); }
            copy.push(temp);
        })
        let error = {};
        for (let i = 0; i < copy.length; i++) {
            const item = copy[i];
            let keys = Object.keys(item);
            let value = item.value;
            let name = item.name;
            if (item.required && !item.value && item.value !== 0) {
                this.ensureObject(error, name);
                error[name] = { required: '不能为空' };
                return error;
            }
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                if (key === 'name' || key === 'required' || key === 'value') {} else {
                    if (!item[key].test(value)) {
                        this.ensureObject(error, name);
                        error[name] = Object.assign(error[name], {
                            [`${key}`]: '格式不正确'
                        });
                    }
                }
            }
        }
        return error;
    }

    ensureObject(object, name) {
        (typeof object[name] !== 'object') ? object[name] = {}: '';
    }
}

export default Validator