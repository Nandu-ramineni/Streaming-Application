const Notifications = ({ notifications }) => {
    return (
        <div className='my-2'>
            <p className='text-lg px-2 pb-2 border-b border-gray-200'>Notifications</p>
            {notifications.length > 0 ? (
                notifications.map(notification => (
                    <div key={notification._id} className="notification p-2 border-b border-gray-200">
                        <p className='text-sm'>{notification.message}</p>
                    </div>
                ))
            ) : (
                <p className='text-sm px-2 py-1 pr-20  text-center w-full'>No notifications available</p>
            )}
        </div>
    );
};

export default Notifications;
