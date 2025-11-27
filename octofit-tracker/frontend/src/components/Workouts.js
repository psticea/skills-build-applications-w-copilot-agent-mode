import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts API endpoint:', endpoint);
        console.log('Fetched workouts data:', data);
        setWorkouts(data.results ? data.results : data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
        setError('Failed to load workouts');
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

  const getWorkoutIcon = (type) => {
    const icons = {
      'cardio': '🏃',
      'strength': '💪',
      'yoga': '🧘',
      'stretching': '🤸',
      'sports': '⚽'
    };
    return icons[type?.toLowerCase()] || '💪';
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">💪 Workouts</h2>
        <button className="btn btn-primary">+ Schedule Workout</button>
      </div>
      
      {workouts.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No workouts scheduled. Create your first workout!
        </div>
      ) : (
        <div className="table-container">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Type</th>
                <th scope="col">Name</th>
                <th scope="col">Date</th>
                <th scope="col">Duration</th>
                <th scope="col">Difficulty</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, idx) => (
                <tr key={idx}>
                  <th scope="row">{idx + 1}</th>
                  <td>{getWorkoutIcon(workout.type)} {workout.type || 'N/A'}</td>
                  <td><strong>{workout.name || 'Workout ' + (idx + 1)}</strong></td>
                  <td>{workout.scheduled_date || workout.date || 'N/A'}</td>
                  <td>{workout.duration || 'N/A'} min</td>
                  <td>
                    <span className={`badge ${workout.difficulty === 'hard' ? 'bg-danger' : workout.difficulty === 'medium' ? 'bg-warning' : 'bg-info'}`}>
                      {workout.difficulty || 'N/A'}
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-success">
                      {workout.status || 'Scheduled'}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
                    <button className="btn btn-sm btn-outline-danger">Cancel</button>
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

export default Workouts;
