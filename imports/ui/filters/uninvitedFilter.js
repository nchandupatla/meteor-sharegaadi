import angular from 'angular';
import _ from 'underscore';

const name = 'uninvitedFilter';

function UninvitedFilter(users, ride) {
  if (!ride) {
    return false;
  }

  return users.filter((user) => {
    // if not the owner and not invited
    return user._id !== ride.owner && !_.contains(ride.invited, user._id);
  });
}

// create a module
export default angular.module(name, [])
  .filter(name, () => {
    return UninvitedFilter;
  });
