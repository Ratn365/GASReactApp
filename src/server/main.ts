// eslint-disable-next-line @typescript-eslint/no-unused-vars

// @ts-ignore
function doGet() {
  return HtmlService.createHtmlOutputFromFile("index").addMetaTag(
    "viewport",
    "width=device-width, initial-scale=1"
  );
}
// @ts-ignore
const onOpen = () => {
  const menu = SpreadsheetApp.getUi()
    .createMenu('App') // edit me!
    .addItem('Greet', 'greetDialog')
    .addItem('Sheet Editor', 'manageSheetDialog')
    .addItem('About me', 'openSidebar');

  menu.addToUi();
};

export const greetDialog = () => {
  const template = HtmlService.createTemplateFromFile('index'); // Load the HTML template
  template.route = "Greet" //pass the dialog route

  const html = template.evaluate()
    .setWidth(600)
    .setHeight(600);

  SpreadsheetApp.getUi().showModalDialog(html, 'Sheet Editor');
};

// @ts-ignore
export const manageSheetDialog = () => {
  const template = HtmlService.createTemplateFromFile('index'); // Load the HTML template
  template.route = "Sheet"//pass the dialog route

  const html = template.evaluate()
    .setWidth(600)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Sheet Editor');
};

// @ts-ignore
export const openSidebar = () => {
   
  const template = HtmlService.createTemplateFromFile('index'); // Load the HTML template
  template.route = "AboutMe" //pass the dialog route

  const html = template.evaluate()

  SpreadsheetApp.getUi().showSidebar(html);
};

