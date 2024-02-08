
import React from 'react';

interface SettingsFormProps {
    settings: {
        login: string;
        repo: string;
        blacklist: string[];
    };
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlacklistChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({
    settings,
    onInputChange,
    onBlacklistChange,
}) => {
    return (
        <div>
            <div className="label-container">
                <label>
                    Your GitHub Login:
                    <input type="text" name="login" value={settings.login} onChange={onInputChange} />
                </label>
            </div>

            <div className="label-container">
                <label>
                    Repository:
                    <input type="text" name="repo" value={settings.repo} onChange={onInputChange} />
                </label>
            </div>

            <div className="label-container">
                <label>
                    Blacklist:
                    <textarea name="blacklist" value={settings.blacklist.join('\n')} onChange={onBlacklistChange} />
                </label>
            </div>  
        </div>
    );
};

export default SettingsForm;


 