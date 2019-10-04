import Parse from 'parse';

/**
 * Parse environment attributes
 */
const environment = {
    serverURL: "https://crud.back4app.io",
    liveQueryServerURL: 'wss://crud.back4app.io',
    applicationID: 'BxDnmBOi8RFmw0GKg6iWJMPgY9jNd9MsPd1Wj3jo',
    javaScriptKey: 'WnxWwWRk5LXlfzBPLDToveYwgBrmd25txAcNs9mI'
}

/**
 * Parse Backend Initializer
 */
export const parseInitializer = () => {
    Parse.serverURL = environment.serverURL;
    Parse.liveQueryServerURL = environment.liveQueryServerURL;
    Parse.initialize(
        environment.applicationID,
        environment.javaScriptKey
    );
}