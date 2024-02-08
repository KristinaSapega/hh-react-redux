import React from 'react';

interface ContributorsListProps {
    contributors: string[];
}

const ContributorsList: React.FC<ContributorsListProps> = ({ contributors }) => {
    return (
        <div>
            <p>Reviewers:</p>
            <ul>
                {contributors.map((contributor) => (
                    <li key={contributor}>{contributor}</li>
                ))}
            </ul>
        </div>
    );
};

export default ContributorsList;
