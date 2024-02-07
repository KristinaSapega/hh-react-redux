//import logo from './logo.svg';

import './App.css';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SettingsForm from './SettingsForm';
import ContributorsList from './ContributorsList';
import { setSettings, setContributors, setReviewer, RootState, setSettingsVisible } from './store';



const App: React.FC = () => {
  const dispatch = useDispatch();
  const { settingsVisible, settings, contributors, reviewer } = useSelector((state: RootState) => state);

//переключения видимости настроек
  const handleToggleSettings = () => {
    dispatch(setSettingsVisible(!settingsVisible)); //диспатчим действие для изменения видимости настроек
  };

  //изменения ввода в форме настроек
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(setSettings({ ...settings, [name]: value })); 
  };

  //изменения чёрного списка в форме настроек
  const handleBlacklistChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const blacklist = event.target.value.split('\n');
    dispatch(setSettings({ ...settings, blacklist }));
  };

  //поиска ревьюера
  const handleSearchReviewer = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${settings.login}/${settings.repo}/contributors`
      );
      const contributorsData = await response.json() as { login: string }[];
      const filteredContributors = contributorsData
        .map((contributor) => contributor.login)
        .filter((login) => !settings.blacklist.includes(login));

      const randomIndex = Math.floor(Math.random() * filteredContributors.length);
      dispatch(setContributors(filteredContributors));
      dispatch(setReviewer(filteredContributors[randomIndex]));
    } catch (error) {
      console.error('Error fetching contributors:', error);
    }
  };


// const App: React.FC = () => {
//   //отслеживание видимости настроек
//   const [settingsVisible, setSettingsVisible] = useState(false);

//   //отслеживание настроек (логин, репо, чёрный список)
//   const [settings, setSettings] = useState<Settings>(() => {
//     const storedSettings = localStorage.getItem('githubReviewSettings')
//     if (storedSettings) {
//       try {
//         return JSON.parse(storedSettings)
//       }
//       catch (e) {}
//     }
//     return {
//       login: '',
//       repo: '',
//       blacklist: [],
//     }
//   });

//   //отслеживание списка контрибьютеров
//   const [contributors, setContributors] = useState<string[]>([]);

//   //отслеживание выбранного ревьюера
//   const [reviewer, setReviewer] = useState<string | null>(null);

//   useEffect(() => {
//     const savedSettings = localStorage.getItem('githubReviewSettings');
//     if (savedSettings) {
//       setSettings(JSON.parse(savedSettings));
//     }
//   }, []);

//   //сохранение настроек в localStorage при изменении settings
//   useEffect(() => {
//     localStorage.setItem('githubReviewSettings', JSON.stringify(settings));
//   }, [settings]);

//   //обработчик для переключения видимости настроек
//   const handleToggleSettings = () => {
//     setSettingsVisible(!settingsVisible);
//   };

//   //обработчик для изменения значений полей ввода логина и репо
//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setSettings((prevSettings) => ({
//       ...prevSettings,
//       [name]: value,
//     }));
//   };

//   //обработчик для изменения значения поля ввода чёрного списка
//   const handleBlacklistChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const blacklist = event.target.value.split('\n');
//     setSettings((prevSettings) => ({
//       ...prevSettings,
//       blacklist,
//     }));
//   };

//   //обработчик для поиска ревьюера
//   const handleSearchReviewer = async () => {
//     try {
//       const response = await fetch(
//         `https://api.github.com/repos/${settings.login}/${settings.repo}/contributors`
//       );
//       const contributorsData = await response.json();

//       //фильтрация контрибьютеров с учетом чёрного списка
//       const filteredContributors = contributorsData
//         .map((contributor: any) => contributor.login)
//         .filter((login: string) => !settings.blacklist.includes(login));

//       //выбор случайного ревьюера из отфильтрованного списка
//       const randomIndex = Math.floor(Math.random() * filteredContributors.length);
//       setReviewer(filteredContributors[randomIndex]);
//       setContributors(filteredContributors);
//     } catch (error) {
//       console.error('Error fetching contributors:', error);
//     }
//   };

  return (
    <div>
      <h1>GitHub Reviewer Finder</h1>
      <button onClick={handleToggleSettings}>Toggle Settings</button>

      {/*вывод компонента SettingsForm при видимости настроек*/}
      {settingsVisible && (
        <SettingsForm
          settings={settings}
          onInputChange={handleInputChange}
          onBlacklistChange={handleBlacklistChange}
        />
      )}

      <button onClick={handleSearchReviewer}>Search Reviewer</button>

      {reviewer && (
        <div>
          <p>Your GitHub Login: {settings.login}</p>
          <ContributorsList contributors={contributors} />
          <p>Selected Reviewer: {reviewer}</p>
        </div>
      )}
    </div>
  );
};

export default App;

