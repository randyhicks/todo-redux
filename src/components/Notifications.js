import React from 'react';
import { connect } from 'react-redux';
import { getNotifications } from '../reducers/reducers';

const Notifications = ({ notifications }) => {
  return <div>{notifications.map(note => <div key={note}>{note}</div>)}</div>;
};

const mapStateToProps = (state, props) => {
  return {
    notifications: getNotifications(state)
  };
};

const NotificationsContainer = connect(mapStateToProps)(Notifications);
export default NotificationsContainer;
