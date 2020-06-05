import React, { useState } from 'react';
import PropTypes from 'prop-types';

const STATUS =  {
    HOVERED: 'hovered',
    NORMAL: 'normal'
};

const Link = ({ page, children }) => {

    const [status, setStatus] = useState(STATUS.NORMAL);

    return (
        <a
            className={status}
            href={page || '#'}
            onMouseEnter={() => setStatus(STATUS.HOVERED)}
            onMouseLeave={() => setStatus(STATUS.NORMAL)}
        >
            { children && children}
        </a>
    );
}

Link.propTypes = {
    page: PropTypes.string,
    children: PropTypes.any,
};

export default Link;