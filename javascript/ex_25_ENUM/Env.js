// NOTE: JavaScript has no native enum. Using Object.freeze() to simulate immutable enum-like objects.

class EnvValue {
    constructor(name, baseUrl) {
        this.name = name;
        this.baseUrl = baseUrl;
    }

    getBaseUrl() {
        return this.baseUrl;
    }

    toString() {
        return this.name;
    }
}

const Env = Object.freeze({
    DEV: new EnvValue('DEV', 'https://dev.myapp.com'),
    STAGING: new EnvValue('STAGING', 'https://staging.myapp.com'),
    PROD: new EnvValue('PROD', 'https://myapp.com')
});

module.exports = Env;
