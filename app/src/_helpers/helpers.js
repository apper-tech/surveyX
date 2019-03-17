const helpers = {
    initDrizzle: function (drizzle) {
        return new Promise(function (resolve, reject) {
            const unsubscribe = drizzle.store.subscribe(() => {
                const drizzleState = drizzle.store.getState();
                if (drizzleState.drizzleStatus.initialized) {
                    resolve({ loading: false, drizzleState, unsubscribe });
                }
            })
        });
    }
};

export default helpers;