window.blazorGeolocation = {
    hasGeolocationFeature: function () {
        return navigator.geolocation ? true : false;
    },
    toSerializable: function (e) {
        return {
            "coords": {
                "latitude": e.coords.latitude,
                "longitude": e.coords.longitude
            },
            "timestamp": new Date(e.timestamp)
        };
    },
    getCurrentPosition: function (geolocationRef, options) {
        function onSuccess(result) {
            return geolocationRef.invokeMethodAsync('RaiseOnGetPosition', blazorGeolocation.toSerializable(result));
        };

        function onError(err) {
            return geolocationRef.invokeMethodAsync('RaiseOnGetPositionError', err.code);
        };

        navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    },
};