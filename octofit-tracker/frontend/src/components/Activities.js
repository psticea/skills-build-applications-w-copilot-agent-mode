import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Activities API endpoint:', endpoint);
        console.log('Fetched activities data:', data);
        setActivities(data.results ? data.results : data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
        setError('Failed to load activities');
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger" role="alert">{error}</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">📋 Activities</h2>
        <button className="btn btn-primary">+ New Activity</button>
      </div>
      
      {activities.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No activities found. Start logging your activities!
        </div>
      ) : (
        <div className="table-container">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Activity Type</th>
                <th scope="col">Duration</th>
                <th scope="col">Date</th>
                <th scope="col">Calories</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, idx) => (
                <tr key={idx}>
                  <th scope="row">{idx + 1}</th>
                  <td>{activity.activity_type || 'N/A'}</td>
                  <td>{activity.duration || 'N/A'} min</td>
                  <td>{activity.date || 'N/A'}</td>
                  <td><span className="badge bg-success">{activity.calories || '0'}</span></td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
                    <button className="btn btn-sm btn-outline-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Activities;
