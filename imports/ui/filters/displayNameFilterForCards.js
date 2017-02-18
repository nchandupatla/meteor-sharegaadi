import angular from 'angular';

const name = 'displayNameFilterForCards';

function DisplayNameFilter(user) {
  if (!user) {
    return '';
  }

  if (user.profile && user.profile.name) {
    var result=[];
    if(user.profile.name.split(" ").length>2){
      var name=user.profile.name.split(" ");
      result.push(name[0]);
      result.push(name[2]);
      return result.join(" ");
    }
    return user.profile.name;
  }

  if (user.emails) {
    return user.emails[0].address;
  }

  if(user.services && user.services.facebook){
    return user.services.facebook.email;
  }

  return user;
}

// create a module
export default angular.module(name, [])
  .filter(name, () => {
    return DisplayNameFilter;
  });
