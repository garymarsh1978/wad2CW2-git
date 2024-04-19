const { check} = require('express-validator');

exports.newFoodInputValidator = [
check("donator", "Donator must be at least 3 characters")
    .not()
    .isEmpty()
    .isLength({ min: 8 }),
    check("quantity", "Quantity must be at least 3 characters")
    .not()
    .isEmpty()
    .isLength({ min: 3 }),
check("donator").exists().isLength({min: 8}).trim().escape().withMessage('Donator must have more than 8 characters'),
check("quantity").exists().isLength({min: 3}).trim().escape().withMessage('Quantity" must have more than 3 characters'),
];
exports.contactInputValidator = [
    check("firstName", "Your first name  must be at least 3 characters")
    .not()
    .isEmpty()
    .isLength({ min: 3 }),
    check("lastName", "Your last name  must be at least 3 characters")
    .not()
    .isEmpty()
    .isLength({ min: 3 }),
    check("email", "Your email is not valid")
    .not()
    .isEmpty()
    .isEmail()
    .normalizeEmail(),
    check("interest")
    .exists()
    .isLength({ min: 5 })
    .trim()
    .escape()
    .withMessage("Interest must have more than 5 characters"),
    check("reqmessage")
    .exists()
    .isLength({ min: 10 })
    .trim()
    .escape()
    .withMessage("Message must have more than 15 characters"),
 check('firstName').exists().isLength({min: 3}).trim().escape().withMessage('First Name must have more than 3 characters'),
 check('lastName').exists().isLength({min: 3}).trim().escape().withMessage('Last Name must have more than 3 characters'),
];
exports.registerUserValidation = [
    check("username", "username must be at least 3 characters")
        .not()
        .isEmpty()
        .isLength({ min: 3 }),
        check("pass", "Password must be at least 8 characters")
        .not()
        .isEmpty()
        .isLength({ min: 8 }),
    check("username").exists().isLength({min: 3}).trim().escape().withMessage('Username must have more than 3 characters'),
    check("pass").exists().isLength({min: 8}).trim().escape().withMessage('Password  must have more than 8 characters'),
    ];
