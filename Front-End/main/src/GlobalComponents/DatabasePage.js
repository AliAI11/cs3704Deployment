import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import axios from 'axios';

function DatabasePage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/get_articles');
            setArticles(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching articles:', error);
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Analyzed Articles Database
                </Typography>
                {loading ? (
                    <Typography>Loading articles...</Typography>
                ) : articles.length === 0 ? (
                    <Typography>No articles have been analyzed yet.</Typography>
                ) : (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Content Preview</TableCell>
                                    <TableCell>Prediction</TableCell>
                                    <TableCell>Source</TableCell>
                                    <TableCell>Analysis Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {articles.map((article) => (
                                    <TableRow key={article.id}>
                                        <TableCell>{article.title}</TableCell>
                                        <TableCell>{article.content}</TableCell>
                                        <TableCell>
                                            <Chip 
                                                label={article.prediction} 
                                                color={article.prediction === 'Real' ? 'success' : 'error'} 
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {article.source_type === 'link' ? (
                                                <a href={article.source_value} target="_blank" rel="noopener noreferrer">
                                                    {article.source_value}
                                                </a>
                                            ) : (
                                                article.source_type
                                            )}
                                        </TableCell>
                                        <TableCell>{article.analysis_date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>
        </Box>
    );
}

export default DatabasePage; 