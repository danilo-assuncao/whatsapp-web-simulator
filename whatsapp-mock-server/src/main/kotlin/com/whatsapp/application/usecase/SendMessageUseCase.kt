package com.whatsapp.application.usecase

import com.whatsapp.domain.model.Message
import com.whatsapp.domain.port.MessageRepository

class SendMessageUseCase(private val messageRepository: MessageRepository) {
    fun execute(message: Message): Message {
        return messageRepository.save(message)
    }
} 