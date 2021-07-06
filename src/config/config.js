const config = {
    firebase: {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    },
    emailjs: {
        serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
        templateSellerId: process.env.REACT_APP_EMAILJS_TEMPLATE_SELLER_ID,
        templateCustomerId: process.env.REACT_APP_EMAILJS_TEMPLATE_CUTOMER_ID,
        userId: process.env.REACT_APP_EMAILJS_USER_ID
    }
};

export default config;