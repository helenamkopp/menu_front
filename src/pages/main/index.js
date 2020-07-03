import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css'

export default class Main extends Component {
    state = {
        plates: [],
        platesInfo: {},
        page: 1, 
    };


    componentDidMount() {
        this.loadPlates();
    }

    loadPlates = async (page = 1) => {
        const response = await api.get(`/plates?page=${page}`);

        const { docs, ...platesInfo } = response.data;

        this.setState({ plates: docs, platesInfo, page })

    };

    prevPage = () => {
        const { page, platesInfo } = this.state;

        if (page === 1) return;

        const pageNumber = page - 1;

        this.loadPlates(pageNumber);
    };

    nextPage = () => {
        const { page, platesInfo } = this.state;

        if (page === platesInfo.pages) return;

        const pageNumber = page + 1;

        this.loadPlates(pageNumber);

    };


    render() {
        const { plates, page, platesInfo} = this.state;

        return (
            <div className="plates-list">
                {plates.map(plate => (
                    <article key={plate._id}>
                        <strong>{plate.name}</strong>
                        <p><strong>Ingredientes:</strong> {plate.ingredients}</p>
                        <p><strong>Temperos:</strong> {plate.spices}</p>
                        <p><strong>Alergênicos:</strong> {plate.allergenic}</p>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === platesInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
        );
    }
}