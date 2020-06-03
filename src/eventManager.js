export const EVENT_TYPE = {
    LOGIN: 'LOGIN'
};

const listeners = [];

export const addListener = listener => {
    listeners.push(listener);
};

export const removeListener = listener => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
        listeners.splice(index, 1);
    }
};

export const publish = event => {
    listeners.forEach(listener => listener(event));
};
