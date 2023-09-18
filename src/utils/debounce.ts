/* eslint-disable no-unused-vars */
function debounce<T extends (...args: any[]) => any>(fn: T, timeout = 1000) {
    let timer: ReturnType<typeof setTimeout>;

    return function (...args: Parameters<T>) {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            fn(...args);
        }, timeout);
    };
}

export default debounce;
