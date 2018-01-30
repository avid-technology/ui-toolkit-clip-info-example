/**
 * Copyright 2017 by Avid Technology, Inc.
 */
import getAsset from './services/data-providers';
import spinner from './Spinner/Spinner';
import { getLocalization } from 'cloudux-l10n';
import l10nData from '../l10n/lang.en.json';
import * as styles from './styles.scss';

export default class ApplicationContainer {
    constructor() {
        this.handleDrop = this.handleDrop.bind(this);
        const welcomeMsg = document.createElement('span');
        welcomeMsg.innerHTML = getLocalization(l10nData)('welcome-info');
        this.content = document.createElement('div');
        this.content.id = 'clip-info';
        this.content.appendChild(welcomeMsg);
        this.content.className = styles['clip-info'];
        this.content.ondragover = event => event.preventDefault();
        this.content.ondrop = event => this.handleDrop(event, this.content);
    }

    handleDrop(event, element) {
        while (element.firstChild) {
            element.removeChild(element.childNodes[0]);
        }
        element.appendChild(spinner);
        getAsset(event)
            .then((data) => {
                while (element.firstChild) {
                    element.removeChild(element.childNodes[0]);
                }
                return Promise.resolve(data);
            })
                .then((data) => {
                    const container = document.createElement('div');
                    const separator = document.createElement('div');
                    separator.className = styles['separator'];
                    const footer = document.createElement('div');
                    footer.className = styles['footer'];
                    const buttonsBar = document.createElement('div');
                    buttonsBar.className = styles['buttonsBar'];
                    const buttonContainer = document.createElement('div');
                    buttonContainer.className = styles['buttonContainer'];
                    const button = document.createElement('button');
                    button.className = styles['button'];
                    button.innerHTML = 'Demo';
                    const inputContainer = document.createElement('div');
                    inputContainer.className = styles['inputContainer'];
                    const input = document.createElement('input');
                    input.className = styles['input'];
                    buttonContainer.appendChild(button);
                    inputContainer.appendChild(input);
                    buttonsBar.appendChild(buttonContainer);
                    buttonsBar.appendChild(inputContainer);

                    if (data.hasOwnProperty('thumbnail') && data.thumbnail !== undefined) {
                        const wrapper = document.createElement('div');
                        wrapper.className = styles['imageWrapper'];
                        const img = document.createElement('img');
                        img.src = data.thumbnail;
                        wrapper.appendChild(img);

                        container.appendChild(wrapper);
                    }
                    container.appendChild(this.createBaseElement(data.base));
                    container.appendChild(separator);
                    container.appendChild(this.createCommonElement(data.common));
                    container.appendChild(buttonsBar);
                    container.appendChild(footer);
                    element.appendChild(container);
                })
                .catch(error => {
                    const errorSpan = document.createElement('span');
                    errorSpan.innerHTML = 'Error wrong asset or server unavailable';

                    while (element.firstChild) {
                        element.removeChild(element.childNodes[0]);
                    }
                    element.appendChild(errorSpan);
                    console.warn(error);
                });
    }

    createBaseElement(base) {
        const baseContainer = document.createElement('fieldset');
        baseContainer.className = styles['fieldSetContainer'];
        const containerLegend = document.createElement('legend');
        const legendText = document.createElement('span');
        legendText.innerHTML = 'Base';
        containerLegend.className = styles['legend'];

        const table = document.createElement('table');
        table.id = 'base';
        table.className = styles['table'];
        table.appendChild(this.createTr('ID:', base.id));
        table.appendChild(this.createTr('System ID:', base.systemID));
        table.appendChild(this.createTr('System type:', base.systemType));
        table.appendChild(this.createTr('Type:', base.type));

        containerLegend.appendChild(legendText);
        baseContainer.appendChild(containerLegend);
        baseContainer.appendChild(table);

        return baseContainer;
    }

    createCommonElement(common) {
        const commonContainer = document.createElement('fieldset');
        commonContainer.className = styles['fieldSetContainer'];
        const containerLegend = document.createElement('legend');
        containerLegend.innerHTML = 'Common';
        containerLegend.className = styles['legend'];

        const table = document.createElement('table');
        table.id = 'common';
        table.className = styles['table'];
        table.appendChild(this.createTr('Created:', common.created));
        table.appendChild(this.createTr('System ID:', common.creator));
        table.appendChild(this.createTr('System type:', common.durationTC));
        table.appendChild(this.createTr('Type:', common.modified));

        commonContainer.appendChild(containerLegend);
        commonContainer.appendChild(table);

        return commonContainer;
    }

    createTr(name, value) {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');

        td1.className = styles['tdLabel'];
        td2.className = styles['tdInfo'];
        td1.innerHTML = name;
        td2.innerHTML = value;
        tr.appendChild(td1);
        tr.appendChild(td2);

        return tr;
    };

    returnElement() {
        return this.content;
    }
}
