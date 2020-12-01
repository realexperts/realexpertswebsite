/*
By default, Klaro will load the config from a global 'klaroConfig' variable. You
can change this by specifying the 'data-config' attribute on your script:
<script src="klaro.js" data-config="myConfigVariableName" /> You can also
disable auto-loading of the consent notice by adding 'data-no-auto-load=true' to
the script tag.
*/
var klaroConfig = {
    /*
    Setting 'testing' to 'true' will cause Klaro to not show the consent notice or
    modal by default, except if a special hash tag is appended to the URL (#klaro-
    testing). This makes it possible to test Klaro on your live website without
    affecting normal visitors.
    */
    testing: false,

    /*
    You can customize the ID of the DIV element that Klaro will create when starting
    up. By default, Klaro will use 'klaro'.
    */
    elementID: 'klaro',

    /*
    You can customize how Klaro persists consent information in the browser. Specify
    either cookie' (the default) or 'localStorage'.
    */
    storageMethod: 'cookie',

    /*
    You can customize the name of the cookie or localStorage entry that Klaro will
    use for storing the consent information. By default, Klaro will use 'klaro'.
    */
    storageName: 'CookieConsent',

    /*
    If set to `true`, Klaro will render the texts given in the
    `consentModal.description` and `consentNotice.description` translations as HTML.
    This enables you to e.g. add custom links or interactive content.
    */
    htmlTexts: false,

    /*
    You can change the cookie domain for the consent manager itself. Use this if you
    want to get consent once for multiple matching domains. By default, Klaro will
    use the current domain. Only relevant if 'storageMethod' is set to 'cookie'.
    */
    //cookieDomain: '.example.com',

    /*
    You can also set a custom expiration time for the Klaro cookie. By default, it
    will expire after 30 days. Only relevant if 'storageMethod' is set to 'cookie'.
    */
    cookieExpiresAfterDays: 30,

    /*
    Defines the default state for services in the consent modal (true=enabled by
    default). You can override this setting in each service.
    */
    default: false,

    /*
    If 'mustConsent' is set to 'true', Klaro will directly display the consent
    manager modal and not allow the user to close it before having actively
    consented or declined the use of third-party services.
    */
    mustConsent: true,

    /*
    Setting 'acceptAll' to 'true' will show an "accept all" button in the notice and
    modal, which will enable all third-party services if the user clicks on it. If
    set to 'false', there will be an "accept" button that will only enable the
    services that are enabled in the consent modal.
    */
    acceptAll:  false,

    /*
    Setting 'hideDeclineAll' to 'true' will hide the "decline" button in the consent
    modal and force the user to open the modal in order to change his/her consent or
    disable all third-party services. We strongly advise you to not use this
    feature, as it opposes the "privacy by default" and "privacy by design"
    principles of the GDPR (but might be acceptable in other legislations such as
    under the CCPA)
    */
    hideDeclineAll: false,

    /*
    Setting 'hideLearnMore' to 'true' will hide the "learn more / customize" link in
    the consent notice. We strongly advise against using this under most
    circumstances, as it keeps the user from customizing his/her consent choices.
    */
    hideLearnMore: false,

    lang: 'de',

    translations: {
        zz: {
            privacyPolicyUrl: '/datenschutz',
        },
    },
    services: [
        {
            name: "CookieConsent",
            description: "Typ: HTTP Cookie; Ablauf: 30 Tage; Beschreibung: Speichert, welche Cookies geladen werden dürfen.",
            required: true,
            purposes: ["Notwendig"],
            optOut: false,
        },
        {
            name: "Youtube",
            description: "Typ: Mehrere Cookies und HTML Storage; Ablauf: Unterschiedlich, bis zu persistent; Beschreibung: Wir betten über Youtube Videos auf unserer Webseite ein. Dabei werden Daten von Youtube und Doubleclick gespeichert und abgerufen.",
            purposes: ["Marketing"],
            optOut: false,
        },
        {
            name: "Podigee",
            description: "Typ: /; Ablauf: /; Beschreibung: Über Podigee ist unser Podcast bei der Webseite einegbettet. Es werden keine Daten gespeichert, der Player wird nur über einen iFrame eingebettet, wobei Daten von Podigee Servern abgerufen werden.",
            purposes: ["Marketing"],
            optOut: false,
        },
        {
            name: "Soundcloud",
            description: "Typ: HTML Local Storage; Ablauf: Persistent; Beschreibung: Wird von der Audio-Plattform SoundCloud verwendet, um ihre eingebetteten Inhalte/Dienste auf der Website zu implementieren, zu messen und zu verbessern - Die Datensammlung umfasst auch die Interaktion der Besucher mit eingebetteten Inhalten/Diensten. Dies kann für Statistiken oder Marketingzwecke genutzt werden.",
            purposes: ["Marketing"],
            optOut: false,
        },
        {
            name: "GoogleMaps",
            description: "Typ: Cookie; Ablauf: ?; Beschreibung: Google Maps wird bei der Kontaktseite zur Anzeige der Adresse verwendet. Dabei können teilweise Cookies gesetzt werden.",
            purposes: ["Marketing"],
            optOut: false,
        }
        /* {
            title: "@@scroll# von youtube.com",
            name: "scrollYoutube",
            description: "Typ: HTML Local Storage; Ablauf: Session",
            purposes: ["Marketing"],
            optOut: false,
        },
        {
            title: "VISITOR_INFO1_LIVE von youtube.com",
            name: "VISITOR_INFO1_LIVEYoutube",
            description: "Typ: HTTP Cookie; Ablauf: 179 Tage; Beschreibung: Versucht, die Benutzerbandbreite auf Seiten mit integrierten YouTube-Videos zu schätzen.",
            purposes: ["Marketing"],
            optOut: false,
        },
        {
            title: "YSC von youtube.com",
            name: "YSCYoutube",
            description: "Typ: HTTP Cookie; Ablauf: Session; Beschreibung: Registriert eine eindeutige ID, um Statistiken der Videos von YouTube, die der Benutzer gesehen hat, zu behalten.",
            purposes: ["Marketing"],
            optOut: false,
        },
        {
            title: "yt-remote-device-id von youtube.com",
            name: "yt-remote-device-idYoutube",
            description: "Typ: HTML Local Storage; Ablauf: Persistent; Beschreibung: Speichert die Benutzereinstellungen beim Abruf eines auf anderen Webseiten integrierten Youtube-Videos",
            purposes: ["Marketing"],
            optOut: false,
        },
        {
            title: "yt-remote-connected-devices von youtube.com",
            name: "yt-remote-connected-devicesYoutube",
            description: "Typ: HTML Local Storage; Ablauf: Persistent; Beschreibung: Speichert die Benutzereinstellungen beim Abruf eines auf anderen Webseiten integrierten Youtube-Videos",
            purposes: ["Marketing"],
            optOut: false,
        },
        {
            title: "yt-remote-session-app von youtube.com",
            name: "yt-remote-session-appYoutube",
            description: "Typ: HTML Local Storage; Ablauf: Session; Beschreibung: Speichert die Benutzereinstellungen beim Abruf eines auf anderen Webseiten integrierten Youtube-Videos",
            purposes: ["Marketing"],
            optOut: false,
        },
        {
            title: "yt-remote-cast-installed von youtube.com",
            name: "yt-remote-cast-installedYoutube",
            description: "Typ: HTML Local Storage; Ablauf: Session; Beschreibung: Speichert die Benutzereinstellungen beim Abruf eines auf anderen Webseiten integrierten Youtube-Videos",
            purposes: ["Marketing"],
            optOut: false,
        },
        {
            title: "yt-remote-session-name von youtube.com",
            name: "yt-remote-session-nameYoutube",
            description: "Typ: HTML Local Storage; Ablauf: Session; Beschreibung: Speichert die Benutzereinstellungen beim Abruf eines auf anderen Webseiten integrierten Youtube-Videos",
            purposes: ["Marketing"],
            optOut: false,
        },
        {
            title: "yt-remote-fast-check-period von youtube.com",
            name: "yt-remote-fast-check-periodYoutube",
            description: "Typ: HTML Local Storage; Ablauf: Session; Beschreibung: Speichert die Benutzereinstellungen beim Abruf eines auf anderen Webseiten integrierten Youtube-Videos",
            purposes: ["Marketing"],
            optOut: false,
        }, */
       /*  {
            title: "test_cookie von doubleclick.net",
            name: "test_cookieDoubleclick",
            description: "Typ: HTTP Cookie; Ablauf: 1 Tag; Beschreibung: Verwendet, um zu überprüfen, ob der Browser des Benutzers Cookies unterstützt.",
            purposes: ["Marketing"],
            optOut: false,
        },
        {
            title: "IDE von doubleclick.net",
            name: "IDEDoubleclick",
            description: "Typ: HTTP Cookie; Ablauf: 1 Jahr; Beschreibung: Verwendet von Google DoubleClick, um die Handlungen des Benutzers auf der Webseite nach der Anzeige oder dem Klicken auf eine der Anzeigen des Anbieters zu registrieren und zu melden, mit dem Zweck der Messung der Wirksamkeit einer Werbung und der Anzeige zielgerichteter Werbung für den Benutzer.",
            purposes: ["Marketing"],
            optOut: false,
        },
        {
            title: "sp_landing von open.spotify.com",
            name: "sp_landingSpotify",
            description: "Typ: HTTP Cookie; Ablauf: 1 Tag; Beschreibung: Wird verwendet, um Audio-Inhalte von Spotify auf der Website zu implementieren. Kann auch verwendet werden, um Benutzerinteraktionen und -präferenzen im Zusammenhang mit Audio-Inhalten zu registrieren - dies kann Statistik- und Marketingzwecken dienen.",
            purposes: ["Marketing"],
            optOut: false,
        },
        {
            title: "sp_t von spotify.com",
            name: "sp_tSpotify",
            description: "Typ: HTTP Cookie; Ablauf: 2 Monate; Beschreibung: Wird verwendet, um Audio-Inhalte von Spotify auf der Website zu implementieren. Kann auch verwendet werden, um Benutzerinteraktionen und -präferenzen im Zusammenhang mit Audio-Inhalten zu registrieren - dies kann Statistik- und Marketingzwecken dienen.",
            purposes: ["Marketing"],
            optOut: false,
        },
        {
            name: "WIDGET::local::assignments von soundcloud.com",
            name: "WIDGET::local::assignmentsSoundcloud",
            description: "Typ: HTML Local Storage; Ablauf: persistens; Beschreibung: Wird von der Audio-Plattform SoundCloud verwendet, um ihre eingebetteten Inhalte/Dienste auf der Website zu implementieren, zu messen und zu verbessern - Die Datensammlung umfasst auch die Interaktion der Besucher mit eingebetteten Inhalten/Diensten. Dies kann für Statistiken oder Marketingzwecke genutzt werden.",
            purposes: ["Marketing"],
            optOut: false,
        }, */
    ],

    /*
    You can define an optional callback function that will be called each time the
    consent state for any given service changes. The consent value will be passed as
    the first parameter to the function (true=consented). The `service` config will
    be passed as the second parameter.
    */
    callback: function(consent, service) {
        console.log(
            'User consent for service ' + service.name + ': consent=' + consent
        );
    },

};