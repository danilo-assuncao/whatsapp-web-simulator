package com.whatsapp.adapters.inbound.rest

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

class HealthController {
    fun configure(routing: Routing) {
        routing {
            get("/health") {
                call.respond(mapOf("status" to "UP"))
            }
        }
    }
}
