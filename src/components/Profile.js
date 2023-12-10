import React from 'react';
import { GITHUB_URL, GET_GITHUB_USER } from './utils/constantsAPI';
import UserContext from './context/UserContext';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {
                name: 'شادمان',
                company: '',
                avatarUrl: ''
            }
        }
    }

    async componentDidMount() {
        const data = await fetch(GET_GITHUB_USER);
        if (!data.ok) {
            console.log('Error fetching github api');
            return;
        }

        const json = await data.json();
        this.setState({
            profile: {
                name: json.name,
                company: json.company,
                avatarUrl: json.avatar_url
            }
        })
    }


    render() {
        const { name, company, avatarUrl } = this.state.profile;

        return (
            <div className='min-h-screen flex justify-center items-center flex-col'>
                <img className='w-36 h-36' src={avatarUrl} />
                <div className='pt-2 text-3xl font-bold'>
                    <UserContext.Consumer>
                        {({ user }) => (!name && <h1>{user.name} - {user.email}</h1>)}
                    </UserContext.Consumer>
                </div>
                <h1 className='pt-2 text-3xl font-bold'>{name}</h1>
                <h2 className='pt-2 text-2xl'>{company}</h2>
                <h2
                    onClick={() => window.open(GITHUB_URL, '_blank').focus()}
                    className='pt-2 text-2xl underline font-semibold text-blue-600 cursor-pointer'
                >{GITHUB_URL}
                </h2>
            </div>
        )
    }
}
