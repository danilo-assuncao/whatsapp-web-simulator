package com.whatsapp.application.usecase

import com.whatsapp.domain.model.Message
import com.whatsapp.domain.port.MessageRepository

class GetMessagesUseCase(private val messageRepository: MessageRepository) {
    fun execute(): List<Message> {
        return messageRepository.findAll()
    }
} 