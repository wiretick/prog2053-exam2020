import { LitElement, html, css } from "../../node_modules/lit-element/lit-element.js";

class EditUser extends LitElement {
  static get properties() {
    return {
      user: { type: Object },
      error: { type: String }
    };
  }

  constructor() {
    super();
    this.user = {}
    this.error = ''
}

  // din kode her
  render() { 
    return html`
      <form id="updateForm">
        <div style="background:red;">${this.error}</div>
        <div>
          <div>
            <input type="text" name="uid" id="uid" value="${this.user.uid}" hidden>
          </div>
          <div>
            <input type="text" name="uname" id="uname" placeholder="username" value="${this.user.uname}">
          </div>
          <div>
            <input type="text" name="firstName" id="firstName" placeholder="first name" value="${this.user.firstName}">
          </div>
          <div>
            <input type="text" name="lastName" id="lastName" placeholder="last name" value="${this.user.lastName}">
          </div>
          <div>
            <input type="password" name="oldpwd" id="oldpwd" placeholder="old password" value="">
          </div>
          <div>
            <input type="password" name="pwd" id="pwd" placeholder="new password" value="">
          </div>
          <button type="button" @click="${this.updateUser}">Update</button>
        </div>
      </form>
    `
  }

  updateUser() {
    let formData = new FormData(this.shadowRoot.getElementById('updateForm'))

    fetch("api/updateUser.php", {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
      if(data['status'] == 'fail')
        this.error = data['msg']
      else
        this.error = ''
    })
    .catch((error) => {
        console.error(error)
    })
  }
}
customElements.define('edit-user', EditUser);
