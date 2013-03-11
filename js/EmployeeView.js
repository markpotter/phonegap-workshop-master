var EmployeeView = function(employee){
  this.initialize = function(){
    this.el = $('<div/>');

    //LOCATION API
    this.el.on('click', '.add-location-btn', this.addLocation);
    //CONTACTS API
    this.el.on('click', '.add-contact-btn', this.addToContacts);
    //CAMERA API
    this.el.on('click', '.change-pic-btn', this.changePicture);
  };

  /*
   * LOCATION API
   */
  this.addLocation = function(event) {
    event.preventDefault();
    console.log('addLocation');
    navigator.geolocation.getCurrentPosition(
        function(position) {
            $('.location', this.el).html(position.coords.latitude + ',' + position.coords.longitude);
        },
        function(error) {
            app.showAlert('Error getting location: code - '+error, 'Error');
        });
    return false;
  };

  /*
   * CONTACT API
   */
  this.addToContacts = function(event) {
    event.preventDefault();
    if (!navigator.contacts) {
        app.showAlert('Contacts API not supported', 'Error');
        return;
    }
    var contact = navigator.contacts.create();
    contact.name = {givenName: employee.firstName, familyName: employee.lastName};
    var phoneNumbers = [];
    phoneNumbers[0] = new ContactField('work', employee.officePhone, false);
    phoneNumbers[1] = new ContactField('mobile', employee.cellPhone, true); // preferred number
    contact.phoneNumbers = phoneNumbers;
    contact.save();
    return false;
  };

  /*
   * CAMERA API
   */
  this.changePicture = function(event) {
    event.preventDefault();
    if (!navigator.camera) {
        app.showAlert('Camera API not supported', 'Error');
        return;
    }
    var options =   {   quality: 50,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                        encodingType: 0     // 0=JPG 1=PNG
                    };

    navigator.camera.getPicture(
        function(imageData) {
            $('.employee-image', this.el).attr('src', 'data:image/jpeg;base64,' + imageData);
        },
        function(error) {
            app.showAlert('Error taking picture - error: '+error, 'Error');
        },
        options);

    return false;
  };

  /*
   * Boiler plate for rendering
   */
  this.render = function(){
    this.el.html(EmployeeView.template(employee));
    return this;
  };

    this.initialize();
};

EmployeeView.template = Handlebars.compile($('#employee-tpl').html());