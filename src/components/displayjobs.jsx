
import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, TextField } from '@material-ui/core';

const Displayjobs = ({ jobs }) => {
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    // filter states
    const [filterCriteria, setFilterCriteria] = useState({
        minExperience: '',
        companyName: '',
        location: ''
    });

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilterCriteria({
            ...filterCriteria,
            [name]: value
        });
    };

    const filterJobs = () => {
        let filteredJobs = jobs && jobs.jdList ? [...jobs.jdList] : [];

        if (filterCriteria.minExperience !== '') {
            filteredJobs = filteredJobs.filter(job => job.minExp >= parseInt(filterCriteria.minExperience));
        }
        if (filterCriteria.companyName !== '') {
            filteredJobs = filteredJobs.filter(job => job.companyName.toLowerCase().includes(filterCriteria.companyName.toLowerCase()));
        }
        if (filterCriteria.location !== '') {
            filteredJobs = filteredJobs.filter(job => job.location.toLowerCase().includes(filterCriteria.location.toLowerCase()));
        }

        return filteredJobs;
    }; 

    return (
        <div style={{ margin: "0 5% 0 5%" }}>
            {/* Filter component */}
            <div>
                <div style={{ marginBottom: '10px' }}>Apply filter</div>
                <div style={{ marginBottom: '20px' }}>
                    <TextField
                        name="minExperience"
                        label="Min Experience"
                        variant="outlined"
                        value={filterCriteria.minExperience}
                        onChange={handleFilterChange}
                        style={{ marginRight: '10px' }}
                    />
                    <TextField
                        name="companyName"
                        label="Company Name"
                        variant="outlined"
                        value={filterCriteria.companyName}
                        onChange={handleFilterChange}
                        style={{ marginRight: '10px' }}
                    />
                    <TextField
                        name="location"
                        label="Location"
                        variant="outlined"
                        value={filterCriteria.location}
                        onChange={handleFilterChange}
                        style={{ marginRight: '10px' }}
                    />
                </div>
            </div>

            {/* Render filtered jobs */}
            <Grid container spacing={3}>
                {filterJobs().map(job => (
                    <Grid key={job.jdUid} item xs={12} sm={6}>
                        <Card style={{ marginBottom: '20px' }}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Role: {job.jobRole}
                                </Typography>
                                <Typography color="textSecondary" style={{ marginTop: '10px' }}>
                                    Company name: {job.companyName}
                                </Typography>
                                <Typography color="textSecondary" style={{ marginTop: '10px' }}>
                                    Location: {job.location}
                                </Typography>

                                {expanded ? (
                                    <>
                                        <Typography variant="body2" component="p" style={{ marginTop: '10px' }}>
                                            {job.jobDetailsFromCompany}
                                        </Typography>
                                        <Button onClick={toggleExpanded} color="primary" style={{ fontSize: '0.8rem', color: '#666' }}>
                                            Show Less
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Typography variant="body2" component="p" style={{ marginTop: '10px' }}>
                                            {job.jobDetailsFromCompany.slice(0, 200)}
                                            {job.jobDetailsFromCompany.length > 200 && '...'}
                                        </Typography>
                                        {job.jobDetailsFromCompany.length > 200 && (
                                            <Button onClick={toggleExpanded} color="primary" style={{ fontSize: '0.8rem', color: '#666' }}>
                                                Show More
                                            </Button>
                                        )}
                                    </>
                                )}

                                <Typography color="textSecondary" style={{ marginTop: '10px' }}>
                                    Experience Required: {job.minExp} - {job.maxExp}
                                </Typography>
                                <Button variant="contained" color="primary" href={job.jdLink} target="_blank" rel="noopener noreferrer" style={{ marginTop: '10px' }}>
                                    Apply
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Displayjobs;
