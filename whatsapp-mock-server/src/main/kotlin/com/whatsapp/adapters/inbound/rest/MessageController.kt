package com.whatsapp.adapters.inbound.rest

import com.whatsapp.application.usecase.GetMessagesUseCase
import com.whatsapp.application.usecase.SendMessageUseCase
import com.whatsapp.domain.model.Message
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.SerializationException
import org.slf4j.LoggerFactory

class MessageController(
    private val sendMessageUseCase: SendMessageUseCase,
    private val getMessagesUseCase: GetMessagesUseCase
) {
    private val logger = LoggerFactory.getLogger(MessageController::class.java)
    private var lastMessageCount = 0

    fun configure(routing: Routing) {
        routing {
            get("/messages") {
                val messages = getMessagesUseCase.execute()
                if (messages.size != lastMessageCount) {
                    logger.info("Retrieved ${messages.size} messages")
                    lastMessageCount = messages.size
                }
                call.respond(messages)
            }

            post("/messages") {
                try {
                    val requestMessage = call.receive<Message>()
                    logger.info("New message received from user ${requestMessage.userId}: ${requestMessage.message}")
                    val savedMessage = sendMessageUseCase.execute(requestMessage)
                    call.respond(HttpStatusCode.Created, savedMessage)
                } catch (e: Exception) {
                    logger.error("Error processing message", e)
                }
            }
        }
    }
}
