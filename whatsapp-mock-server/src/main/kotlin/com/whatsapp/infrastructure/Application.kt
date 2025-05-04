package com.whatsapp.infrastructure

import com.whatsapp.adapters.inbound.rest.HealthController
import com.whatsapp.adapters.inbound.rest.MessageController
import com.whatsapp.adapters.outbound.repository.InMemoryMessageRepository
import com.whatsapp.application.usecase.GetMessagesUseCase
import com.whatsapp.application.usecase.SendMessageUseCase
import com.whatsapp.domain.port.MessageRepository
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.routing.*
import io.ktor.serialization.kotlinx.json.*

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        module()
    }.start(wait = true)
}

fun Application.module() {
    // Configure CORS
    install(CORS) {
        allowMethod(HttpMethod.Options)
        allowMethod(HttpMethod.Get)
        allowMethod(HttpMethod.Post)
        allowMethod(HttpMethod.Put)
        allowMethod(HttpMethod.Delete)
        allowHeader(HttpHeaders.ContentType)
        allowHeader(HttpHeaders.Authorization)
        allowCredentials = true
        anyHost()
    }

    // Configure JSON serialization
    install(ContentNegotiation) {
        json(JsonConfig.json)
    }

    // Configure repositories
    val messageRepository: MessageRepository = InMemoryMessageRepository()

    // Configure use cases
    val sendMessageUseCase = SendMessageUseCase(messageRepository)
    val getMessagesUseCase = GetMessagesUseCase(messageRepository)

    // Configure controllers
    val healthController = HealthController()
    val messageController = MessageController(sendMessageUseCase, getMessagesUseCase)

    // Configure routing
    routing {
        healthController.configure(this)
        messageController.configure(this)
    }
}
