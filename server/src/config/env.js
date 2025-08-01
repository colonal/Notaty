function getEnv(key) {
    const value = process.env[key];
    return value;
}

function getEnvForce(key) {
    const value = getEnv(key);
    if (!value) {
        throw new Error(`Environment variable ${key} is not set`);
    }
    return value;
}

function isDev() {
    return getEnv('NODE_ENV') === 'development';
}

export { getEnv, getEnvForce, isDev };

