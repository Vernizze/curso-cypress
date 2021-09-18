describe("Tickets", () => {
    //Constants
    const firstName = "Carlos Felippe";
    const lastName = "Vernizze";
    const fullName = `${firstName} ${lastName}`;
    const email = "carlos.vernizze@outlook.com";
    const headerMessage = "TICKETBOX";

    beforeEach(() => 
        cy
            .visit("https://bit.ly/2XSuwCW")
            .get("button[type='reset']").as("resetButton")
            .get("button[type='submit']").as("submitButton")
            .get("#first-name").as("firstNameInputText")
            .get("#last-name").as("lastNameInputText")
            .get("#email").as("emailInputText")
            .get("#requests").as("requestsInputText")
            .get("#signature").as("signatureInputText")
            .get("#ticket-quantity").as("ticketQttSelect")
            .get("#vip").as("ticketTypeRadio")            
            .get("#friend").as("friendCheckBox")
            .get("#publication").as("publicationCheckBox")
            .get("#social-media").as("socialMediaCheckBox")
            .get("#agree").as("agreeCheckBox")
            .get("header h1").as("headerTicketBox")
            .get(".agreement p").as("agreementText")
        );

    it("fill's all the text input fields", () => 
        cy
            .get("@firstNameInputText")
                .type(firstName)
            .get("@lastNameInputText")
                .type(lastName)
            .get("@emailInputText")
                .type(email)
            .get("@requestsInputText")
                .type("primeira fila")
            .get("@signatureInputText")
                .type(fullName));

    it("select two tickets", () => 
        cy
            .get("@ticketQttSelect")
                .select("2"));

    it("select 'vip' ticket type", () => 
        cy
            .get("@ticketTypeRadio")
                .check());

    it("selects 'social media' check box", () => 
        cy
            .get("@socialMediaCheckBox")
                .check());

    it("selects 'friend', and 'publication', then uncheck 'friend'", () => 
        cy
            .get("@friendCheckBox")
                .check()
            .get("@publicationCheckBox")
                .check()
            .get("@friendCheckBox")
                .uncheck()); 

    it("has 'TICKETBOX' header's heading", () => 
        cy
            .get("@headerTicketBox").should("contain", headerMessage));

    it("alerts on invalid email", () => 
        cy
            .get("@emailInputText")
                .type(fullName)
            .get("@emailInputText.invalid")
                .should("exist")
            .clear()
                .type(email)
            .get("#email.invalid")
                .should("not.exist"));

    it("fills all and reset form", () => 
        cy
            //Arrange
            .fillAllFields({
                firstName: firstName,
                lastName: lastName,
                email: email,
                fullName: fullName,
                request: "primeira fila",
                ticketQtt: "2",
                isVip: true,
                hearAboutUsFromFriend: true,
                hearAboutUsFrompublication: true,
                hearAboutUsFromSocialMedia: true,
                agreeTheTerms: true
            })
            //Act and Assertions
            //Verifiy if agreement message is correctly
            .get("@agreementText")
                .should("contain", `I, ${fullName}, wish to buy 2 VIP tickets.`)
            //Verifiy if Reset Button is not disabled
            .get("@resetButton")
                .should("not.be.disabled")
            //Verifiy if Submit Button is not disabled
            .get("@submitButton")
                .should("not.be.disabled")
            //Click at the Reset Button
            .get("@resetButton")
                .click()
            //Verifiy if Submit Button is disabled
            .get("@submitButton")
                .should("be.disabled"));

    it("fills mandatory fields using support command", () => 
        //Arrange
        cy
            .fillMandatoryFields({
                firstName: firstName,
                lastName: lastName,
                email: email
            })
            //Act and Assertions
            .get("@submitButton")
                .should("not.be.disabled")
            .get("@agreeCheckBox")
                .uncheck()
            .get("@submitButton")
                .should("be.disabled"));
});