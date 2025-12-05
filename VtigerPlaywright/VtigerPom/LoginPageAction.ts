import { WebUtil } from "../VtigerWebutile/webUtil";
import { LoginOR } from "../VtigerPageor/LoginPage_OR";
import { Page } from "playwright-core";

export class LoginAction extends LoginOR {
     private web: WebUtil; 
    private page:Page
    constructor(page:Page) {
        super(page)
        this.web = new WebUtil(page);
        this.page=page;
    }

    async validateLogin(username: string, password: string, themeLabel: string) {
        await this.web.fillText(this.usernameInput, username);
        await this.web.fillText(this.passwordInput, password);
        await this.web.selectDropdownByLabel(this.themeDropdown, themeLabel);
        await this.web.clickElement(this.loginButton);
        await this.page.waitForLoadState();
    }
}
