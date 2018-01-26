'use strict';

exports.handler = function(event, context) {
    try {
        //New session
        if(event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        //Events Handler
        if(event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletRespone) {
                    context.succeed(buildRespone(sessionAttributes, speechletRespone));
                });
        } else if(event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletRespone) {
                    context.succeed(buildRespone(sessionAttributes, speechletRespone));
                });
        } else if(event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

//Events
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
        + ", sessionId=" + session.sessionId);
}

function onLaunch(launchRequest, session, callback) {
    var cardTitle = "Hello, World !";
    var speechOutput = "Hello World !";
    callback(session.attributes,
        buildSpeechletRespone(cardTitle, speechOutput, "", true));
}

function onIntent(intentRequest, session, callback) {
    var intent = intentRequest.intent;
    var intentName = intentRequest.intent.name;
    if(intentName == "TestIntent") {
        handleTestRequest(intent, session, callback);
    } else {
        throw "Invalid intent";
    }
}

function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId + ", sessionId=" + session.sessionId);
}

function handleTestRequest(intent, session, callback) {
    callback(session.attributes, buildSpeechletResponeWithoutCard("Hello, World !", "", "true"));
}
/*------Helper functions to build responses------*/ 

function buildSpeechletRespone(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        repromt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponeWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        repromt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildRespone(sessionAttributes, speechletRespone) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        respone: speechletRespone
    };
}