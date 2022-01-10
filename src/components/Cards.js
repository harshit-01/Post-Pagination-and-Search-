import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function Cards({pgShow,val,posts}) {
    // console.log(totalPost,pagePerRow)
    function truncateString(str, num) {
        if (str.length <= num) {
        return str
        }
        return str.slice(0, num) + '...'
    }
    function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
    }

    function stringAvatar(name) {
    return {
        sx: {
        bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}`,
    };
    }

    return (
        <>
        {pgShow == false && val?
            <div className="card text-dark border-primary mb-3" style={{maxWidth: "345px",minHeight:"250px"}}>
                <div className="card-header fw-bold d-flex align-items-center"><Avatar {...stringAvatar(`${val.id}`)} /> <span className="ms-2 text-primary">UserId: {val.userId}</span></div>
                <div className="card-body">
                    <h5 className="card-title text-bold fst-italic">{truncateString(val.title,25)}</h5>
                    <p className="card-text">{truncateString(val.body,100)}</p>
                </div>
            </div> : null
        }
        {pgShow && posts?
            <div className="card text-dark border-primary mb-3" style={{maxWidth: "345px",minHeight:"250px"}}>
                <div className="card-header fw-bold d-flex align-items-center"><Avatar {...stringAvatar(`${posts.id}`)} /> <span className="ms-2 text-primary">UserId: {posts.userId}</span></div>
                <div className="card-body">
                    <h5 className="card-title text-bold fst-italic">{truncateString(posts.title,25)}</h5>
                    <p className="card-text">{truncateString(posts.body,100)}</p>
                </div>
            </div> : null
        }
        </>
    );
}


