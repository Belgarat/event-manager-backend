'use strict';

module.exports = function(Events) {

    /**
   * Search by eventCode and return unique record
   *
   * @param {String} code
   * @callback {Function} callback
   */
    Events.findByCode = function(code, cb){
        //console.log(code);
        Events.find({where: {eventCode: code}}, function(err,record){
            if (err) cb(err);
            if (!err) cb(null, record[0]);
        });
    };

    Events.remoteMethod(
        'findByCode',
        {
            http: {path: '/findByCode/:code', verb: 'get'},
            accepts: {arg: 'code', type: 'string', required: true, http: { source: 'path' }},
            returns: {root: true, type: 'object'},
            description: 'Get an event from event code'
        }
    );

     /**
   * Search by eventCode and return all contacts
   *
   * @param {String} code
   * @callback {Function} callback
   */
    Events.contactsByCode = function(code, cb){
        //console.log(code);
        Events.find({include: 'contacts', where: {eventCode: code}}, function(err,record){
            if (err) cb(err);
            if (!err) cb(null, record[0]);
        });
    };

    Events.remoteMethod(
        'contactsByCode',
        {
            http: {path: '/contactsByCode/:code', verb: 'get'},
            accepts: {arg: 'code', type: 'string', required: true, http: { source: 'path' }},
            returns: {root: true, type: 'object'},
            description: 'Get list of contacts from event code'
        }
    );

     /**
   * Search by eventCode and return all contacts
   *
   * @param {String} code
   * @callback {Function} callback
   */
    Events.registeredByCode = function(code, cb){
        //console.log(code);
        Events.find({include: 'registered', where: {eventCode: code}}, function(err,record){
            if (err) cb(err);
            if (!err) cb(null, record[0]);
        });
    };

    Events.remoteMethod(
        'registeredByCode',
        {
            http: {path: '/registeredByCode/:code', verb: 'get'},
            accepts: {arg: 'code', type: 'string', required: true, http: { source: 'path' }},
            returns: {root: true, type: 'object'},
            description: 'Get list of registered from event code'
        }
    );

    /**
   * Search by eventCode and email and return 1 contact
   *
   * @param {String} code
   * @param {String} mail
   * @callback {Function} callback
   */
    Events.contactEmailExists = function(code, mail, cb){
        Events.find({
            where: {eventCode: code}, 
            include: {
                relation: 'contacts', 
                scope: {
                    where: {email: mail}
                }
            }
        },
        function(err,record){
            if (err) cb(err);
            if (!err) cb(null, record[0]);
        });
    };

    Events.remoteMethod(
        'contactEmailExists',
        {
            http: {path: '/contactEmailExists/:code/:mail', verb: 'get'},
            accepts: [
                {arg: 'code', type: 'string', required: true, http: { source: 'path' }},
                {arg: 'mail', type: 'string', required: true, http: { source: 'path' }}
            ],
            returns: {root: true, type: 'object'},
            description: 'Get 1 contact if from event code and with matched email'
        }
    );

};
