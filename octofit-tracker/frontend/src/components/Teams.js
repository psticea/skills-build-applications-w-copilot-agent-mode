import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Teams API endpoint:', endpoint);
        console.log('Fetched teams data:', data);
        setTeams(data.results ? data.results : data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
        setError('Failed to load teams');
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
        <h2 className="mb-0">👥 Teams</h2>
        <button className="btn btn-primary">+ Create Team</button>
      </div>
      
      {teams.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No teams available. Create your first team!
        </div>
      ) : (
        <div className="row">
          {teams.map((team, idx) => (
            <div className="col-md-6 col-lg-4 mb-4" key={idx}>
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">{team.name || 'Team ' + (idx + 1)}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    <strong>Members:</strong> {team.member_count || team.members || '0'}
                  </p>
                  <p className="card-text">
                    <strong>Points:</strong> <span className="badge bg-success">{team.points || team.score || '0'}</span>
                  </p>
                  <p className="card-text">
                    <strong>Created:</strong> {team.created_date || 'N/A'}
                  </p>
                </div>
                <div className="card-footer bg-light">
                  <button className="btn btn-sm btn-outline-primary me-2">View</button>
                  <button className="btn btn-sm btn-outline-secondary me-2">Edit</button>
                  <button className="btn btn-sm btn-outline-danger">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Teams;
