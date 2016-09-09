class UserAddController {
  constructor($stateParams, $state, API) {
    'ngInject';

    //
    this.$state = $state;
    this.formSubmitted = false;
    this.alerts = [];
    this.API = API;

    if ($stateParams.alerts) {
      this.alerts.push($stateParams.alerts)
    }
    let Roles = API.service('roles', API.all('users'));
    Roles.getList()
        .then((response) => {
          let systemRoles = [];
          let roleResponse = response.plain();

          angular.forEach(roleResponse, function (value) {
            systemRoles.push({id: value.id, name: value.name})
          });

          this.systemRoles = systemRoles;
        })
  }
  
  static isEmptyObject(obj) {
    if (typeof obj == 'undefined')
      return true;
    if (obj == null)
      return true;
    for (let key in obj)
      if (obj.hasOwnProperty(key))
        return false;
    return true;
  }

  save (isValid) {
    if (isValid) {
      let UserAPI = this.API.service('users');
      let $state = this.$state;
      console.log(this.name, this.email, this.role);

      UserAPI.post({
        name: this.name,
        email: this.email,
        role: this.role
      }).then(function () {
        let alert = { type: 'success', 'title': 'Success!', msg: 'Permission has been added.' }
        $state.go($state.current, { alerts: alert})
      }, function (response) {
        let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
        $state.go($state.current, { alerts: alert})
      })
    } else {
      this.formSubmitted = true;
    }
  }

  $onInit() {
  }
}

export const UserAddComponent = {
  templateUrl: './views/app/components/user-add/user-add.component.html',
  controller: UserAddController,
  controllerAs: 'vm',
  bindings: {}
}
