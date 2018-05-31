'use strict';

const Boom = require('boom');
const crypto = require("crypto");
const NodeCache = require( "node-cache" );
const pollCache = new NodeCache();



module.exports = {
    getAll : (request, reply) => {
        let facts = pollCache.mget( pollCache.keys() );
        return Object.values(facts).map( (fact) => ({"id": fact.id, "name" : fact.name}) );
    },

    get : (request, reply) => {
        let poll = pollCache.get(request.params.id);
        if ( poll === undefined){
            throw Boom.notFound("Cannot find the requested poll");
        } else {
            return poll;
        }
    },

    post : (request, reply) => {
        let post = request.payload;
        if ( post.id === undefined ) {
            post.id = post.id || crypto.randomBytes(16).toString("hex");
        }
        pollCache.set(post.id, post);
        return "success";
    },

    delete : (request, reply) => {

        let count = pollCache.del(request.params.id);
        if ( count === 0){
            throw Boom.notFound("Cannot find the requested poll");
        } else {
            return "deleted";
        }
    }
};