// NOTE: JavaScript has no native enum. Using Object.freeze() to simulate immutable enum-like objects.

const DOMAIN_URLs = Object.freeze({
    google: 'google',
    katalon: 'katalon',
    vwo: 'vwo',
    restassured: 'restassured'
});

// Main
console.log(DOMAIN_URLs.google);
