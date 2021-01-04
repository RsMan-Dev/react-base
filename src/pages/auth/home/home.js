import React, { Component } from "react";
import { MDBCol, MDBRow, MDBIcon } from "mdbreact";
import AuthenticatedLayout from "../../layouts/auth/authenticated";
import './home.css';
import CloudSongBox from '../../../items/home/cloud-song-box/cloud-song-box';
import PlaylistSongBox from "../../../items/home/playlist-song-box/playlist-song-box";
import {getAll as getBoxes} from "../../../utils/box";
import {getAll as getTasks, add as addTask, del as delTask} from "../../../utils/task";
import {getAllFromNextCloud as getSongsFromCloud, getAll as getSongs, add as addSong, del as delSong} from "../../../utils/songs";
import BoxStatus from "../../../items/home/box-status/box-status";


class Home extends Component {
    state={
        boxes:null,
        box_selected:null,
        side_collapsed: true,
        cloud_songs: null,
        tasks: null,
        playlist: null
    }

    componentDidMount() {
        this.setState({
            boxes:null,
            box_selected:null,
            side_collapsed: true,
            cloud_songs: null,
            tasks: null,
            playlist: null
        });
        this.updateCloudSongs();
        this.updateBoxes();
        setInterval(() => {
            this.updateCloudSongs();
            this.updateBoxes();
        },30000);
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        //console.log(this.state);
    }

    updateBoxes = () => {

        getBoxes(
            data => {
                this.setState({boxes: data.boxes} ,() => {
                    if( data.boxes.length > 0 ) {
                        this.changeBox(this.state.box_selected == null ? data.boxes[0] : [...data.boxes].find( b => b.mac_address === this.state.box_selected.mac_address) ? [...data.boxes].find( b => b.mac_address === this.state.box_selected.mac_address): data.boxes[0] );
                    }
                });
            },
            data=> { this.setState({boxes: []}) }
        );
    }

    updateCloudSongs = ()=>{
        getSongsFromCloud(
            data => { this.setState({cloud_songs: data.songs} ) },
            data => { this.setState({cloud_songs: []}) }
        );
    }

    updateTasks = (box) => {
        getTasks( box.mac_address, 10,
            data => { this.setState({tasks: data.tasks}) },
            data => { this.setState({tasks: []}) }
        );
    }

    addSongToPlaylist = (song) => {
        addSong(this.state.box_selected.mac_address, song.url, song.filename, true,
            data => { this.setState({playlist: data.songs})},
            data => { this.setState({playlist: []}) }
        );
    }

    updatePlaylist= (box)=>{
        getSongs( box.mac_address,
            data => { this.setState({playlist: data.songs})},
            data => { this.setState({playlist: []}) }
        );
    }

    changeBox(box){ console.log('changeBox');
        this.setState({box_selected: box});
        this.updatePlaylist(box);
        this.updateTasks(box);
    }

    sideToggle=()=>{
        this.setState({side_collapsed: !this.state.side_collapsed});
    }
    deleteSong=(song)=>{
        delSong(this.state.box_selected.mac_address, song.id, true,
            data => { this.setState({playlist: data.songs}) },
            data => { this.setState({playlist: []}) }
        );
        this.updateTasks(this.state.box_selected);
    }
    addTask=(label,song_id,data)=>{
        addTask(this.state.box_selected.mac_address, label, song_id, data, true, 10,
            data => { this.setState({tasks: data.tasks}) },
            data => { this.setState({tasks: []}) }
        );
    }
    removeTask=(id)=>{
        delTask(this.state.box_selected.mac_address, id, true, 10,
            data => { this.setState({tasks: data.tasks}) },
            data => { this.setState({tasks: []}) }
        );
    }

    render() {
        let cloudSongs = ["Checking songs"];
        if( this.state.cloud_songs ){
            if( this.state.cloud_songs.length > 0 ){
                cloudSongs = [];
                this.state.cloud_songs.forEach((v,k)=>{
                    cloudSongs.push(<CloudSongBox key={"song"+v.url} keyNum={k} filename={v.filename} onClickAdd={()=>{this.addSongToPlaylist(v)}}>  </CloudSongBox>)
                })
            } else {
                cloudSongs = ['Aucun son dans le cloud a votre nom.'];
            }
        }
        let playlist = ["Checking songs"];
        let showActions = false;
        let playingMusic = null;
        if( this.state.playlist ){
            if( this.state.playlist.length > 0 ){
                playlist = [];
                showActions = true;
                this.state.playlist.forEach((v,k)=>{
                    if(v.playing){playingMusic = v.filename}
                    playlist.push(<PlaylistSongBox key={"song"+v.url} keyNum={k} filename={v.filename} playing = {v.playing} onClickPlay={()=>{this.addTask('play',v.id,null)}} onClickTrash={()=>{this.deleteSong(v)}}> {v.filename} </PlaylistSongBox>)
                })
            } else {
                playlist = ['Aucun son.'];
            }
        }
        if(this.state.mac_address === "") playlist = ['Sélectionnez un RPI'];
        return (
            <AuthenticatedLayout selected_box={this.state.box_selected} boxes={this.state.boxes} onChangeBox={mac_address=>{this.changeBox(mac_address)}}>
                <div className={`h-100 container-xl`}>
                    <MDBRow center className="position-relative h-100 custom-scrollbar" style={{overflowX: "hidden",overflowY: "auto"}}>
                        {
                            showActions ?
                                (
                                    <MDBCol size="12" md={"5"} xl="4" className={"py-3 d-flex flex-column"}>
                                        <div className="opacity-0 d-none d-md-block">
                                            <h2 className={'h3-responsive font-weight-bold'}>E</h2>
                                            <span>E</span>
                                            <hr className={'w-25 mb-4'} style={{borderTop: "6px solid white"}}/>
                                        </div>
                                        <BoxStatus playingMusic={playingMusic} volume={this.state.box_selected.volume} tasks={this.state.tasks} box_selected={this.state.box_selected} onAddTask={this.addTask} onDeleteTask={this.removeTask} first_song_id={this.state.playlist[0].id}/>
                                        <div className={`side-cover rgba-black-strong ${this.state.side_collapsed ? "" : "active"}`} onClick={() => {this.sideToggle()}}/>
                                    </MDBCol>
                                )
                                :null
                        }
                        <MDBCol size="12" md={"7"} xl={showActions ? "4" : "8"}  className="h-100 py-3 h-100">
                            <div className="h-100 text-center overflow-auto custom-scrollbar">
                                <div className={'d-flex'}>
                                    <div className={'w-100'}>
                                        <h2 className={'h3-responsive font-weight-bold w-100'}>PLAYLIST</h2>
                                        <span>LISTE DE LECTURE DU BOITIER SELECTIONNE</span>
                                        <hr className={'w-25 mb-3'} style={{borderTop: "6px solid white"}}/>
                                    </div>
                                    <MDBIcon icon="cloud" size={'2x'} onClick={() => {this.sideToggle()}} className="rgba-white-slight p-2 d-flex align-items-center d-md-none" style={{height: '1.5em', borderRadius: "4px", cursor: 'pointer'}} />
                                </div>
                                {playlist}
                            </div>
                            <div className={`side-cover rgba-black-strong ${this.state.side_collapsed ? "" : "active"}`} onClick={() => {this.sideToggle()}}/>
                        </MDBCol>
                        <MDBCol size="11" md="6" xl="4" className={`shadow-sm position-md-absolute cloud-songs h-100 py-3 ${this.state.side_collapsed ? "collapsed-right" : ""}`}>
                            <div className={'h-100 text-center overflow-auto custom-scrollbar'}>
                                <MDBIcon icon="cloud" onClick={() => {this.sideToggle()}} className="rgba-white-slight" />
                                <h2 className={'h3-responsive font-weight-bold'}>FICHIERS DISTANTS</h2>
                                <span>FICHIERS DISPONIBLES DANS LE CLOUD</span>
                                <hr className={'w-25 mb-4'} style={{borderTop: "6px solid white"}}/>
                                {cloudSongs}
                            </div>
                        </MDBCol>
                    </MDBRow>
                </div>
            </AuthenticatedLayout>
        );
    }
}

export default Home;
