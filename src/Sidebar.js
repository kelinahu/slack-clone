import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { 
    FiberManualRecord, 
    Create, 
    InsertComment,
    Inbox,
    Drafts,
    BookmarkBorder,
    PeopleAlt,
    Apps,
    FileCopy,
    ExpandLess,
    ExpandMore,
    Add
} from '@material-ui/icons';
import SidebarOption from './SidebarOption';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {
    const [channels, setChannels] = useState([]);
    const [{ user }] = useStateValue();

    useEffect(() => {
        db.collection('rooms').onSnapshot((snapshot) => (
            setChannels(
                snapshot.docs.map(doc =>({
                    id: doc.id,
                    name: doc.data().name
                }))
            )
        ))
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <div className="sidebar_info">
                <h2>networknt</h2>
                <h3>
                    <FiberManualRecord/>
                    {user?.displayName}
                </h3>
            </div>
            <Create/>
            </div>
            <SidebarOption Icon={InsertComment} title="Threads"/>
            <SidebarOption Icon={Inbox} title="Mentions & reactions"/>
            <SidebarOption Icon={Drafts} title="Saved items"/>
            <SidebarOption Icon={BookmarkBorder} title="Channel browser"/>
            <SidebarOption Icon={PeopleAlt} title="People & user groups"/>
            <SidebarOption Icon={Apps} title="Apps"/>
            <SidebarOption Icon={FileCopy} title="File browser"/>
            <SidebarOption Icon={ExpandLess} title="Show less"/>
            <hr/>
            <SidebarOption Icon={ExpandMore} title="Channels"/>
            <hr/>
            <SidebarOption Icon={Add} addChannelOption title="Add Channel"/>

            {channels.map(channel => (
                <SidebarOption title={channel.name} key={channel.id} id={channel.id}/>
            ))}
        </div>
    )
}

export default Sidebar
