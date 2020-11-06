function printError(element, message) {
    document.getElementById(element).innerHTML = message;
}

function validateForm() {
    // alert('you have submitted');
    var firstname = document.contactForm.firstname.value;
    var lastname = document.contactForm.lastname.value;
    var email = document.contactForm.email.value;
    var mobile = document.contactForm.mobile.value;

    var firstnameErr = lastnameErr = emailErr = mobileErr =  true;

    if(firstname=="") {
        printError("firstnameErr", "Please enter your firstname");
    } else {
        var regex = /^[a-zA-Z\s}]+$/;
        if (regex.test(firstname)===false) {
            printError("firstnameErr", "Please enter a valid firstname");
        } else {
            printError("firstnameErr", "");
            firstnameErr = false;
        }
    }

    if(lastname=="") {
        printError("lastnameErr", "Please enter your lastname");
    } else {
        var regex = /^[a-zA-Z\s}]+$/;
        if (regex.test(lastname)===false) {
            printError("lastnameErr", "Please enter a valid lastname");
        } else {
            printError("lastnameErr", "");
            lastnameErr = false;
        }
    }

    if(email=="") {
        printError("emailErr", "Please enter your email");
    } else {
        var regex = /^\S+@\S+\.\S+$/;
        if (regex.test(email)===false) {
            printError("emailErr", "Please enter a valid email");
        } else {
            printError("emailErr", "");
            emailErr = false;
        }
    }

    if(mobile == "") {
        printError("mobileErr", "Please enter mobile number");
    } else {
        var regex = /^\d{10}$/;
        if(regex.test(mobile) === false) {
            printError("mobileErr", "Please enter a valid mobile number")
        } else if (mobile.length() != 10) {
            printError("mobileErr", "Please enter a valid mobile number")
        } else {
            printError("mobileErr", "");
            mobileErr = false;
        }
    }

    if (firstnameErr == true || lastnameErr == true || emailErr == true || mobileErr == true ) {
        // alert('Submission Failed! Retry.');
        return false;
    } else {
        alert('You have submitted the form..');
    }
}




// Blog Class: Represents a Blog
class Blog {
    constructor(title, body) {
      this.title = title;
      this.body = body;
    }
  }

  
  // UI Class: Handle UI Tasks
  class UI {
    static displayBlogs() {
      const blogs = Store.getBlogs();
  
      blogs.forEach((blog) => UI.addBlogToList(blog));
    }
  
    static addBlogToList(blog) {
      const list = document.querySelector('#blog-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${blog.title}</td>
        <td>${blog.body}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteBlog(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#blog-form');
      container.insertBefore(div, form);
  
      // Vanish in 3 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
    static clearFields() {
      document.querySelector('#title').value = '';
      document.querySelector('#body').value = '';
    }
  }
  
  
  // Event: Display Blogs
  document.addEventListener('DOMContentLoaded', UI.displayBlogs);
  
  // Event: Add a Blog
  document.querySelector('#blog-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    // Get form values
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    // const isbn = document.querySelector('#isbn').value;
  
    // Validate
    if(title === '' || body === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      // Instatiate blog
      const blog = new Blog(title, body);
  
      // Add Blog to UI
      UI.addBlogToList(blog);
  
      // Add blog to store
      Store.addBlog(blog);
  
      // Show success message
      UI.showAlert('Blog Added', 'success');
  
      // Clear fields
      UI.clearFields();
    }
  });
  
  // Event: Remove a Blog
  document.querySelector('#blog-list').addEventListener('click', (e) => {
    // Remove blog from UI
    UI.deleteBlog(e.target);
  
    // Remove blog from store
    Store.removeBlog(e.target.parentElement.previousElementSibling.textContent);
  
    // Show success message
    UI.showAlert('Blog Removed', 'success');
  });

// var BstrapModal = function (title, body, buttons) {
//     var title = title || "Lorem Ipsum History", body = body || "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", buttons = buttons || [{ Value: "CLOSE", Css: "btn-primary", Callback: function (event) { BstrapModal.Close(); } }];
//     var GetModalStructure = function () {
//         var that = this;
//         that.Id = BstrapModal.Id = Math.random();
//         var buttonshtml = "";
//         for (var i = 0; i < buttons.length; i++) {
//             buttonshtml += "<button type='button' class='btn " + (buttons[i].Css||"") + "' name='btn" + that.Id + "'>" + (buttons[i].Value||"CLOSE") + "</button>";
//         }
//         return "<div class='modal fade' name='dynamiccustommodal' id='" + that.Id + "' tabindex='-1' role='dialog' data-backdrop='static' data-keyboard='false' aria-labelledby='" + that.Id + "Label'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close modal-white-close' onclick='BstrapModal.Close()'><span aria-hidden='true'>&times;</span></button><h4 class='modal-title'>" + title + "</h4></div><div class='modal-body'><div class='row'><div class='col-xs-12 col-md-12 col-sm-12 col-lg-12'>" + body + "</div></div></div><div class='modal-footer bg-default'><div class='col-xs-12 col-sm-12 col-lg-12'>" + buttonshtml + "</div></div></div></div></div>";
// }();
//     BstrapModal.Delete = function () {
//         var modals = document.getElementsByName("dynamiccustommodal");
//         if (modals.length > 0) document.body.removeChild(modals[0]);
//     };
//     BstrapModal.Close = function () {
//         $(document.getElementById(BstrapModal.Id)).modal('hide');
//         BstrapModal.Delete();
//     };    
//     this.Show = function () {
//         BstrapModal.Delete();
//         document.body.appendChild($(GetModalStructure)[0]);
//         var btns = document.querySelectorAll("button[name='btn" + BstrapModal.Id + "']");
//         for (var i = 0; i < btns.length; i++) {
//             btns[i].addEventListener("click", buttons[i].Callback || BstrapModal.Close);
//         }
//         $(document.getElementById(BstrapModal.Id)).modal('show');
//     };
// };