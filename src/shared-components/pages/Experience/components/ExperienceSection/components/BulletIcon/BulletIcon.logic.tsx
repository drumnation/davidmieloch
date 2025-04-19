import React from 'react';
import {
    FaCode,
    FaDatabase,
    FaCloud,
    FaUsers,
    FaTools,
    FaChartLine,
    FaLightbulb,
    FaBook,
    FaCogs,
    FaServer,
    FaMobileAlt,
    FaUserShield,
    FaPencilAlt,
    FaFileAlt,
    FaTasks,
    FaRocket,
    FaSearch,
    FaHandshake,
    FaGlobe,
    FaRegCheckCircle,
    FaBug,
} from 'react-icons/fa';

// Pure function to determine which icon component to render based on text
export const getBulletIconComponent = (text: string): JSX.Element => {
    const lowerText = text.toLowerCase();

    if (
        lowerText.includes('develop') ||
        lowerText.includes('code') ||
        lowerText.includes('program') ||
        lowerText.includes('implement')
    ) {
        return <FaCode />;
    } else if (
        lowerText.includes('database') ||
        lowerText.includes('data') ||
        lowerText.includes('sql')
    ) {
        return <FaDatabase />;
    } else if (
        lowerText.includes('cloud') ||
        lowerText.includes('aws') ||
        lowerText.includes('azure') ||
        lowerText.includes('infrastructure')
    ) {
        return <FaCloud />;
    } else if (
        lowerText.includes('lead') ||
        lowerText.includes('team') ||
        lowerText.includes('manage') ||
        lowerText.includes('collaborat')
    ) {
        return <FaUsers />;
    } else if (
        lowerText.includes('tool') ||
        lowerText.includes('build') ||
        lowerText.includes('construct')
    ) {
        return <FaTools />;
    } else if (
        lowerText.includes('analytics') ||
        lowerText.includes('growth') ||
        lowerText.includes('improve') ||
        lowerText.includes('metric')
    ) {
        return <FaChartLine />;
    } else if (
        lowerText.includes('design') ||
        lowerText.includes('architec') ||
        lowerText.includes('creat')
    ) {
        return <FaLightbulb />;
    } else if (
        lowerText.includes('learn') ||
        lowerText.includes('research') ||
        lowerText.includes('study')
    ) {
        return <FaBook />;
    } else if (
        lowerText.includes('config') ||
        lowerText.includes('settings') ||
        lowerText.includes('setup')
    ) {
        return <FaCogs />;
    } else if (
        lowerText.includes('server') ||
        lowerText.includes('backend') ||
        lowerText.includes('api')
    ) {
        return <FaServer />;
    } else if (
        lowerText.includes('mobile') ||
        lowerText.includes('app') ||
        lowerText.includes('responsive')
    ) {
        return <FaMobileAlt />;
    } else if (
        lowerText.includes('security') ||
        lowerText.includes('protect') ||
        lowerText.includes('privacy')
    ) {
        return <FaUserShield />;
    } else if (
        lowerText.includes('write') ||
        lowerText.includes('document') ||
        lowerText.includes('review')
    ) {
        return <FaPencilAlt />;
    } else if (
        lowerText.includes('launch') ||
        lowerText.includes('deploy') ||
        lowerText.includes('release')
    ) {
        return <FaRocket />;
    } else if (
        lowerText.includes('test') ||
        lowerText.includes('debug') ||
        lowerText.includes('fix')
    ) {
        return <FaBug />;
    } else if (
        lowerText.includes('client') ||
        lowerText.includes('partner') ||
        lowerText.includes('stakeholder')
    ) {
        return <FaHandshake />;
    } else if (
        lowerText.includes('global') ||
        lowerText.includes('international') ||
        lowerText.includes('worldwide')
    ) {
        return <FaGlobe />;
    } else if (
        lowerText.includes('complete') ||
        lowerText.includes('achieve') ||
        lowerText.includes('success') ||
        lowerText.includes('deliver')
    ) {
        return <FaRegCheckCircle />;
    } else if (
        lowerText.includes('search') ||
        lowerText.includes('find') ||
        lowerText.includes('discover')
    ) {
        return <FaSearch />;
    } else if (
        lowerText.includes('task') ||
        lowerText.includes('project')
    ) {
        return <FaTasks />;
    } else if (
        lowerText.includes('file') ||
        lowerText.includes('report') ||
        lowerText.includes('document')
    ) {
        return <FaFileAlt />;
    } else {
        // Default icon if no specific match
        return <FaRegCheckCircle />;
    }
}; 