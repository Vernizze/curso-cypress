// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('fillMandatoryFields', data => 
    cy
        .get("@firstNameInputText")
            .type(data.firstName)
        .get("@lastNameInputText")
            .type(data.lastName)
        .get("@emailInputText")
            .type(data.email)
        .get("@agreeCheckBox")
            .check())

Cypress.Commands.add('fillAllFields', data => {
    cy
        //Texts
        .get("@firstNameInputText")
            .type(data.firstName)
        .get("@lastNameInputText")
            .type(data.lastName)
        .get("@emailInputText")
            .type(data.email)
        .get("@requestsInputText")
            .type(data.request)
        .get("@signatureInputText")
            .type(data.fullName)
        //Selects
        .get("@ticketQttSelect")
            .select(data.ticketQtt)            
        ;

    //Radios
    if (data.isVip)
        cy
            .get("@ticketTypeRadio")
                .check();

    //CheckBoxes
    if (data.hearAboutUsFromFriend)
        cy
            .get("@friendCheckBox")
                .check();
    else
        cy
            .get("@friendCheckBox")
                .uncheck();

    if (data.hearAboutUsFrompublication)
        cy
            .get("@publicationCheckBox")
                .check();
    else
        cy
            .get("@publicationCheckBox")
                .uncheck();

    if (data.hearAboutUsFromSocialMedia)
        cy
            .get("@socialMediaCheckBox")
                .check();
    else
        cy
            .get("@socialMediaCheckBox")
                .uncheck();

    if (data.agreeTheTerms)
        cy
            .get("@agreeCheckBox")
                .check();
    else
        cy
            .get("@agreeCheckBox")
                .uncheck();
})