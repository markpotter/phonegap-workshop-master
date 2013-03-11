var EmployeeView = function(employee){
  this.initialize = function(){
    this.el = $('<div/>');

    //LOCATION API
    this.el.on('click', '.add-location-btn', this.addLocation);
  };

  //LOCATION API
  this.addLocation = function(event) {
    event.preventDefault();
    console.log('addLocation');
    navigator.geolocation.getCurrentPosition(
        function(position) {
            $('.location', this.el).html(position.coords.latitude + ',' + position.coords.longitude);
        },
        function(error) {
            alert('New - Error getting location '+error.code);
        });
    return false;
  };

  this.render = function(){
    this.el.html(EmployeeView.template(employee));
    return this;
  };

    this.initialize();
};

EmployeeView.template = Handlebars.compile($('#employee-tpl').html());