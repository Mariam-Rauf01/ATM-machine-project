#! /usr/bin/env node

import inquirer from "inquirer";

let cashBack: number = 10000;
let pincode: number = 1234;

async function atm() {
  const userPinResponse = await inquirer.prompt([
    {
      name: "userPin",
      type: "number",
      message: "Enter your pin code:",
    },
  ]);
  const userPin = userPinResponse.userPin;

  if (pincode !== userPin) {
    console.log("Incorrect pincode, please enter the correct pin!");
    return;
  }

  const actionResponse = await inquirer.prompt([
    {
      name: "action",
      type: "list",
      message: "Select your option:",
      choices: ["withdraw", "check cash", "fast cash", "deposit", "change PIN"],
    },
  ]);
  const action = actionResponse.action;

  if (action === "withdraw") {
    const amountResponse = await inquirer.prompt([
      {
        name: "amount",
        type: "number",
        message: "Enter the amount to withdraw:",
        validate: function (value) {
          if (value > cashBack) {
            return `Insufficient balance. Your current balance is ${cashBack}`;
          }
          return true;
        },
      },
    ]);
    const amount = amountResponse.amount;

    cashBack -= amount;
    console.log(`Withdrawn successful. Remaining balance: ${cashBack}`);
  } else if (action === "check cash") {
    console.log(`Your current amount is: ${cashBack}`);
  } else if (action === "fast cash") {
    const fastActionResponse = await inquirer.prompt([
      {
        name: "fastAction",
        type: "list",
        message: "Select your option:",
        choices: [2000, 5000, 7000],
      },
    ]);
    const fastAction: number = fastActionResponse.fastAction;

    cashBack -= fastAction;
    console.log(
      `Fast cash of ${fastAction} withdrawn. Remaining balance: ${cashBack}`
    );
  } else if (action === "deposit") {
    const depositResponse = await inquirer.prompt([
      {
        name: "amount",
        type: "number",
        message: "Enter the amount to deposit:",
      },
    ]);
    const amount = depositResponse.amount;

    cashBack += amount;
    console.log(`Deposit of ${amount} successful. New balance: ${cashBack}`);
  } else if (action === "change PIN") {
    const newPinResponse = await inquirer.prompt([
      {
        name: "newPin",
        type: "number",
        message: "Enter your new PIN:",
      },
    ]);
    const newPin = newPinResponse.newPin;

    pincode = newPin;
    console.log("PIN changed successfully.");
  }
}

atm();
